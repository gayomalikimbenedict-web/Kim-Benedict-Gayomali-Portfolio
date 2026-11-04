import React, { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, FabricObject, Textbox } from 'fabric';
import './SettingsCanvas.css';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 675;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type CanvasObject = FabricObject & {
  id?: string;
  kind?: 'text' | 'image';
};

type CanvasSnapshot = {
  version: string;
  background: string;
  objects: Array<Record<string, unknown>>;
};

type SelectionDetails = {
  kind: string;
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
};

const makeId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('The selected image could not be read.'));
      }
    };
    reader.onerror = () => reject(new Error('The selected image could not be read.'));
    reader.readAsDataURL(file);
  });

const readJsonResponse = async (response: Response): Promise<Record<string, unknown>> => {
  const text = await response.text();
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error('The local settings server returned an invalid response.');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('The local settings server returned an invalid response.');
  }
  const result = payload as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(
      typeof result.error === 'string' ? result.error : 'The canvas request failed.'
    );
  }
  return result;
};

const isCanvasSnapshot = (value: unknown): value is CanvasSnapshot => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const snapshot = value as Partial<CanvasSnapshot>;
  return (
    Array.isArray(snapshot.objects) &&
    snapshot.objects.length <= 100 &&
    snapshot.objects.every((item) => {
      if (!item || typeof item !== 'object') return false;
      const object = item as Record<string, unknown>;
      return (
        (object.type === 'Textbox' && object.kind === 'text') ||
        (object.type === 'Image' && object.kind === 'image')
      ) &&
        typeof object.id === 'string' &&
        typeof object.left === 'number' &&
        typeof object.top === 'number' &&
        typeof object.width === 'number' &&
        typeof object.height === 'number' &&
        typeof object.scaleX === 'number' &&
        typeof object.scaleY === 'number' &&
        typeof object.angle === 'number' &&
        (object.type !== 'Textbox' ||
          (typeof object.text === 'string' && typeof object.fill === 'string')) &&
        (object.type !== 'Image' || typeof object.src === 'string');
    })
  );
};

const SettingsCanvas: React.FC = () => {
  const elementRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [selection, setSelection] = useState<SelectionDetails | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let active = true;
    const canvas = new Canvas(element, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#0b132b',
      selection: false,
      preserveObjectStacking: true,
      uniformScaling: true,
      centeredRotation: true,
      uniScaleKey: null,
      selectionBorderColor: '#62d8e2',
      selectionColor: 'rgba(98, 216, 226, 0.12)',
    });
    canvasRef.current = canvas;
    FabricObject.customProperties = Array.from(
      new Set([...FabricObject.customProperties, 'id', 'kind'])
    );
    FabricObject.prototype.set({
      borderColor: '#62d8e2',
      borderScaleFactor: 1.5,
      cornerColor: '#f5fbff',
      cornerStrokeColor: '#36bdcf',
      cornerStyle: 'circle',
      cornerSize: 12,
      transparentCorners: false,
      padding: 2,
    });

    const updateSelection = () => {
      const object = canvas.getActiveObject() as CanvasObject | undefined;
      if (!object) {
        setSelection(null);
        return;
      }
      setSelection({
        kind: object.kind === 'image' ? 'Image' : 'Text',
        left: Math.round(object.left || 0),
        top: Math.round(object.top || 0),
        scaleX: object.scaleX || 1,
        scaleY: object.scaleY || 1,
        angle: Math.round(object.angle || 0),
      });
    };
    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', updateSelection);
    canvas.on('object:modified', updateSelection);
    canvas.on('object:moving', updateSelection);
    canvas.on('object:scaling', updateSelection);
    canvas.on('object:rotating', updateSelection);

    const loadCanvas = async () => {
      try {
        const response = await fetch('/api/canvas');
        const result = await readJsonResponse(response);
        if (!isCanvasSnapshot(result.canvas)) {
          throw new Error('Saved canvas data is invalid.');
        }
        await canvas.loadFromJSON(result.canvas);
        if (!active) return;
        canvas.requestRenderAll();
        setReady(true);
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : 'Unable to load the canvas.');
        }
      }
    };
    void loadCanvas();

    return () => {
      active = false;
      canvasRef.current = null;
      void canvas.dispose();
    };
  }, []);

  const addText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const text = new Textbox('Double-click to edit', {
      left: 120,
      top: 120,
      width: 360,
      fontSize: 36,
      fontFamily: 'Arial',
      fill: '#f5f7ff',
      originX: 'left',
      originY: 'top',
      editable: true,
      splitByGrapheme: true,
    }) as CanvasObject;
    text.id = makeId();
    text.kind = 'text';
    canvas.add(text);
    canvas.setActiveObject(text);
    text.setCoords();
    canvas.requestRenderAll();
    setMessage('Text box added. Double-click it to edit its text.');
  };

  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setMessage('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setMessage('Choose an image smaller than 4 MB.');
      return;
    }

    setBusy(true);
    setMessage('');
    try {
      const source = await readFileAsDataUrl(file);
      const image = (await FabricImage.fromURL(source)) as CanvasObject;
      const scale = Math.min(1, 420 / image.width, 320 / image.height);
      image.set({
        left: 180,
        top: 160,
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
      });
      image.id = makeId();
      image.kind = 'image';
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.add(image);
      canvas.setActiveObject(image);
      image.setCoords();
      canvas.requestRenderAll();
      setMessage('Image added to the canvas.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to add this image.');
    } finally {
      setBusy(false);
    }
  };

  const deleteSelected = () => {
    const canvas = canvasRef.current;
    const selected = canvas?.getActiveObject();
    if (!canvas || !selected) return;
    canvas.remove(selected);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    setSelection(null);
    setMessage('Selected element removed.');
  };

  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    setMessage('');
    try {
      const snapshot = canvas.toObject(['id', 'kind']) as CanvasSnapshot;
      const response = await fetch('/api/canvas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canvas: snapshot }),
      });
      await readJsonResponse(response);
      setMessage('Canvas saved to the local database.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save the canvas.');
    } finally {
      setBusy(false);
    }
  };

  const activeObject = canvasRef.current?.getActiveObject() as CanvasObject | undefined;
  const canEditText = activeObject?.kind === 'text';

  return (
    <section className="settings-canvas-section" aria-labelledby="settings-canvas-title">
      <div className="settings-canvas-heading">
        <div>
          <span className="section-kicker">VISUAL EDITOR</span>
          <h3 id="settings-canvas-title">Canvas</h3>
          <p>Add text or pictures, then drag, resize, and rotate them on the canvas.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={saveCanvas} disabled={!ready || busy}>
          {busy ? 'Saving…' : 'Save canvas'}
        </button>
      </div>

      <div className="settings-canvas-toolbar" aria-label="Canvas tools">
        <button className="btn btn-secondary" type="button" onClick={addText} disabled={!ready || busy}>
          Add text
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={!ready || busy}
        >
          Add picture
        </button>
        <input
          ref={fileInputRef}
          className="settings-canvas-file"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={addImage}
          tabIndex={-1}
          aria-label="Choose a picture for the canvas"
        />
        <button
          className="btn btn-secondary"
          type="button"
          onClick={deleteSelected}
          disabled={!ready || !selection}
        >
          Delete selected
        </button>
        {canEditText ? <span className="settings-canvas-hint">Double-click text to edit</span> : null}
      </div>

      <div className="settings-canvas-frame">
        <canvas ref={elementRef} aria-label="Interactive settings canvas" />
      </div>

      <div className="settings-canvas-footer">
        <p className="settings-canvas-message" role="status" aria-live="polite">
          {message || (ready ? 'Select an element to show its resize and rotation handles.' : 'Loading canvas…')}
        </p>
        {selection ? (
          <output className="settings-canvas-selection">
            {selection.kind} · {selection.left}, {selection.top} · {Math.round(selection.scaleX * 100)}% ×{' '}
            {Math.round(selection.scaleY * 100)}% · {selection.angle}°
          </output>
        ) : null}
      </div>
    </section>
  );
};

export default SettingsCanvas;
