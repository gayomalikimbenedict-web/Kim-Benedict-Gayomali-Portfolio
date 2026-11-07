import type { MethodStep } from './schema'

/** How I approach a project: four phases, with the working steps under each one. */
export const method = {
  eyebrow: 'How I work',
  title: 'Understand. Plan. Build. Refine.',
  titleThin: 'Understand. Plan.',
  titleBold: 'Build. Refine.',
  summary: 'Four phases. Under each one are the working steps I follow, one improvement at a time.',
  steps: [
    {
      name: 'Understand the workflow',
      body: 'I learn your goals, existing processes, and operational challenges.',
      inputs: ['Identify the problem', 'Define the requirements', 'Set acceptance criteria'],
    },
    {
      name: 'Plan the right solution',
      body: 'I define requirements, set priorities, and plan the best approach.',
      inputs: ['Plan the smallest solution'],
    },
    {
      name: 'Build and validate',
      body: 'I develop the solution incrementally, test its functionality, and verify results.',
      inputs: ['Build one change at a time', 'Run relevant tests', 'Inspect the real result'],
    },
    {
      name: 'Refine and improve',
      body: 'I review feedback, make improvements, and ensure long-term value.',
      inputs: ['Review the changes', 'Approve and integrate', 'Move to the next step'],
    },
  ] satisfies MethodStep[],
}
