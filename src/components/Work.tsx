import { projects, workIntro } from '../data/content'
import type { Project } from '../data/content'
import { SectionHead } from './SectionHead'
import './Work.css'

function ProjectBody({ project }: { project: Project }) {
  const { image } = project
  return (
    <>
      <div className="shot">
        <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 900px) 92vw, 560px" alt={image.alt} width={image.width} height={image.height} loading="lazy" />
      </div>
      <div className="body">
        <span className="kick">{project.kicker}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {project.href ? <span className="open">Open walkthrough</span> : null}
      </div>
    </>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <SectionHead id="work-title" eyebrow="Selected work" title={workIntro.title} lede={workIntro.lede} />
      <div className="grid work">
        {projects.map((project) =>
          project.href ? (
            <a key={project.id} className={`card proj ${project.layout}`} href={project.href} target="_blank" rel="noopener noreferrer" data-reveal>
              <ProjectBody project={project} />
            </a>
          ) : (
            <article key={project.id} className={`card proj ${project.layout}`} data-reveal>
              <ProjectBody project={project} />
            </article>
          ),
        )}
      </div>
    </section>
  )
}
