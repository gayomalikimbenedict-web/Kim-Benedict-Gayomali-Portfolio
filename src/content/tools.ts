import type { ToolMark } from './schema'

/**
 * Letter marks, not vendor logos: each tile is a simple monogram drawn for this site (public/images/tools/).
 * Swap a file for an official logo only if the vendor's brand rules allow it.
 */
const mark = (name: string, file: string, mono?: true): ToolMark => ({ name, logo: `/images/tools/${file}`, mono })

export const tools = {
  excel: mark('Microsoft Excel', 'excel.svg'),
  sheets: mark('Google Sheets', 'sheets.svg'),
  appsScript: mark('Apps Script', 'apps-script.svg'),
  javascript: mark('JavaScript', 'javascript.svg'),
  html: mark('HTML', 'html.svg'),
  sqlite: mark('SQLite', 'sqlite.svg'),
  opencv: mark('OpenCV', 'opencv.svg'),
  flask: mark('Flask', 'flask.svg'),
  ghl: mark('GoHighLevel', 'ghl.svg'),
  claude: mark('Claude', 'claude.svg'),
  copilot: mark('GitHub Copilot', 'copilot.svg'),
  react: mark('React', 'react.svg'),
} satisfies Record<string, ToolMark>

export const dailyTools: ToolMark[] = [tools.excel, tools.sheets, tools.appsScript, tools.javascript, tools.html, tools.claude, tools.copilot]
