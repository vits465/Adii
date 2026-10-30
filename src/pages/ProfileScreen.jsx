import React from 'react'
import {
  Mail,
  Phone,
  FileDown,
  ExternalLink,
  Code2,
  Server,
  Database,
  Layers,
  GraduationCap,
  Award,
  Globe2,
  CheckCircle2,
  ArrowUpRight,
  Terminal,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import { personalInfo, skillsData, projectsData, educationAndCertifications } from '../data/portfolioData'

export default function ProfileScreen({ onSelectProject, onNavigate }) {
  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Profile Header Hero */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                FULL-STACK DEVELOPER
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/5 border border-white/10">
                BCA DISTINCTION (8.78 SGPA)
              </span>
              <span className="text-xs font-mono text-zinc-400">
                SURAT, GUJARAT, INDIA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-sarrif font-black text-white tracking-wide">
              {personalInfo.name}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              {personalInfo.summary}
            </p>

            {/* Quick Contact & Social Links */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-zinc-200 transition-all shadow-md"
              >
                <GithubIcon size={15} />
                <span>GITHUB: @vits465</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
              >
                <LinkedinIcon size={15} />
                <span>LINKEDIN</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
              >
                <Mail size={15} />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.resumePath}
                download="Aditya_Chauhan_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs tracking-wider border border-emerald-500/40 transition-all"
              >
                <FileDown size={15} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="w-full lg:w-auto shrink-0 grid grid-cols-2 gap-3">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-3xl font-sarrif font-black text-white">156+</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-1">REST Endpoints</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-3xl font-sarrif font-black text-white">43</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-1">MongoDB Collections</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-3xl font-sarrif font-black text-emerald-400">8.78</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-1">BCA SGPA</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-3xl font-sarrif font-black text-white">12+</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-1">Public Repos</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE PROJECT IMAGE GALLERY (Requested specifically by user) */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
              LIVE DEPLOYMENTS & REAL SCREENSHOTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-sarrif font-bold text-white tracking-wide">
              MY LIVE PROJECTS & CODE.
            </h2>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Live Project Image Container */}
              <div
                className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Live Pill */}
                {project.liveUrl && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE DEPLOYMENT</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 text-xs font-mono text-zinc-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  {project.category}
                </div>
              </div>

              {/* Project Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-sarrif font-bold text-white hover:text-zinc-300 cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-sans line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {project.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white text-black font-mono font-bold text-[11px] tracking-wider hover:bg-zinc-200 transition-all"
                    >
                      <ExternalLink size={12} />
                      <span>LIVE DEMO</span>
                    </a>
                  )}

                  {(project.github || project.githubFrontend) && (
                    <a
                      href={project.github || project.githubFrontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 text-[11px] font-mono border border-white/10 transition-all"
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: TECHNICAL SKILLS TAXONOMY */}
      <div className="mb-20">
        <div className="mb-8 pb-4 border-b border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
            CORE PROFICIENCIES & ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-sarrif font-bold text-white tracking-wide">
            TECHNICAL ARSENAL.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Frontend */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Code2 size={20} />
              <h3 className="font-sarrif font-bold text-lg text-white">Frontend Engineering</h3>
            </div>
            <div className="space-y-3">
              {skillsData.frontend.map((s, idx) => (
                <div key={idx} className="pb-2.5 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-200">{s.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">{s.level}</span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-sky-400">
              <Server size={20} />
              <h3 className="font-sarrif font-bold text-lg text-white">Backend & REST APIs</h3>
            </div>
            <div className="space-y-3">
              {skillsData.backend.map((s, idx) => (
                <div key={idx} className="pb-2.5 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-200">{s.name}</span>
                    <span className="text-[10px] font-mono text-sky-400 uppercase">{s.level}</span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Database, 3D & Tools */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-purple-400">
                <Database size={20} />
                <h3 className="font-sarrif font-bold text-lg text-white">Database & 3D Shaders</h3>
              </div>

              <div className="mb-4">
                <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2">Databases</div>
                <div className="space-y-2">
                  {skillsData.database.map((s, idx) => (
                    <div key={idx} className="text-xs text-zinc-300">
                      <span className="font-semibold text-white">{s.name}</span>: {s.desc}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2">3D, WebGL & Animation</div>
                <div className="space-y-2">
                  {skillsData.animationAnd3D.map((s, idx) => (
                    <div key={idx} className="text-xs text-zinc-300">
                      <span className="font-semibold text-white">{s.name}</span>: {s.desc}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2">DevOps & Cloud</div>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.toolsAndDevOps.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: EXPERIENCE, EDUCATION & CERTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education & Academic Honors */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-6 text-emerald-400">
            <GraduationCap size={24} />
            <h2 className="text-2xl font-sarrif font-bold text-white">Education & Honors</h2>
          </div>

          {educationAndCertifications.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {edu.honors}
                </span>
                <span className="text-xs font-mono text-zinc-400">{edu.completion}</span>
              </div>
              <h3 className="text-xl font-sarrif font-bold text-white mt-1">
                {edu.degree}
              </h3>
              <div className="text-sm font-sans text-zinc-300 mt-1">
                {edu.institution}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                Affiliated to {edu.affiliation}
              </div>
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                {edu.highlights}
              </p>
            </div>
          ))}

          {/* Languages */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Spoken Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {educationAndCertifications.languages.map((l, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  <span className="font-bold text-white">{l.name}</span> — {l.level}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Certifications & Academy */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-6 text-sky-400">
            <Award size={24} />
            <h2 className="text-2xl font-sarrif font-bold text-white">Academy & Certifications</h2>
          </div>

          <div className="space-y-4">
            {educationAndCertifications.certifications.map((cert, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-sarrif font-bold text-white">
                    {cert.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20">
                    {cert.status}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-300">
                  {cert.provider}
                </div>
                <p className="text-xs text-zinc-400 mt-2 font-sans">
                  {cert.topics}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA to Capstone Record */}
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs font-mono text-zinc-400">
              Want to inspect the 156-endpoint architecture?
            </div>
            <button
              onClick={() => onNavigate('record')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-zinc-200 transition-all"
            >
              <span>INSPECT RECORD</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
