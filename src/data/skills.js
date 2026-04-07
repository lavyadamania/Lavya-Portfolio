import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiGit,
  SiDocker,
  SiFigma,
  SiPostman,
  SiGraphql,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import { TbApi, TbKeyframes } from 'react-icons/tb'

export const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: SiReact,
    skills: [
      { name: 'React', percentage: 90, icon: SiReact },
      { name: 'Next.js', percentage: 82, icon: SiNextdotjs },
      { name: 'TypeScript', percentage: 78, icon: SiTypescript },
      { name: 'Tailwind', percentage: 92, icon: SiTailwindcss },
      { name: 'Three.js', percentage: 70, icon: SiThreedotjs },
      { name: 'Framer Motion', percentage: 75, icon: TbKeyframes },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: SiNodedotjs,
    skills: [
      { name: 'Node.js', percentage: 85, icon: SiNodedotjs },
      { name: 'Express', percentage: 83, icon: SiExpress },
      { name: 'Python', percentage: 72, icon: SiPython },
      { name: 'REST APIs', percentage: 88, icon: TbApi },
      { name: 'GraphQL', percentage: 65, icon: SiGraphql },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: SiMongodb,
    skills: [
      { name: 'MongoDB', percentage: 80, icon: SiMongodb },
      { name: 'PostgreSQL', percentage: 74, icon: SiPostgresql },
      { name: 'MySQL', percentage: 70, icon: SiMysql },
      { name: 'Firebase', percentage: 76, icon: SiFirebase },
      { name: 'Redis', percentage: 60, icon: SiRedis },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: SiDocker,
    skills: [
      { name: 'Git', percentage: 90, icon: SiGit },
      { name: 'Docker', percentage: 68, icon: SiDocker },
      { name: 'AWS', percentage: 58, icon: FaAws },
      { name: 'Figma', percentage: 80, icon: SiFigma },
      { name: 'VS Code', percentage: 95, icon: VscVscode },
      { name: 'Postman', percentage: 88, icon: SiPostman },
    ],
  },
]
