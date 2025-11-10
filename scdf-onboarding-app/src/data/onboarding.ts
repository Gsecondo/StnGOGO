import { ServiceStream, StationBrief } from '../types';

export const stationBrief: StationBrief = {
  stationName: 'Central Fire Station',
  address: '62 Hill Street, Singapore 179367',
  commandCenter: 'Division HQ Alpha',
  upcomingDrills: [
    {
      id: 'drill-ems-1',
      name: 'Mass Casualty Triage Simulation',
      date: '2025-11-18',
      services: ['ems', 'frs'],
    },
    {
      id: 'drill-frs-1',
      name: 'High-Rise Fire Evacuation Drill',
      date: '2025-11-25',
      services: ['frs'],
    },
  ],
  onboardingExpectations: [
    'Complete all mandatory orientation tasks within the first 14 days.',
    'Log daily reflections and questions for the station mentor.',
    'Participate in at least one joint EMS/FRS cross-training session per week.',
  ],
  sharedResources: [
    {
      id: 'resource-handbook',
      title: 'SCDF Station Onboarding Handbook',
      description: 'Overview of station policies, emergency protocols, and key contacts.',
      type: 'document',
      link: 'https://www.scdf.gov.sg',
    },
    {
      id: 'resource-comms',
      title: 'Radio Communications Essentials',
      description: 'Primer on call signs, message structure, and comms discipline.',
      type: 'video',
    },
    {
      id: 'resource-checklist',
      title: 'Daily Parade Checklist',
      description: 'Checklist for station parade readiness covering apparatus and PPE.',
      type: 'checklist',
    },
  ],
};

export const serviceStreams: ServiceStream[] = [
  {
    id: 'ems',
    title: 'Emergency Medical Services',
    mission:
      'Deliver rapid, compassionate pre-hospital care and execute medical interventions that save lives.',
    overview:
      'As an EMS officer at Central Fire Station, you will master ambulance operations, clinical protocols, and collaborative drills with Fire & Rescue counterparts.',
    color: '#007AFF',
    stationContacts: [
      { name: 'LTA Nurul Hassan', role: 'EMS Mentor', phone: '+65 8123 4567' },
      { name: 'SSG Adrian Lim', role: 'Paramedic-in-Charge', phone: '+65 8765 1234' },
    ],
    keyEquipment: [
      'Lifepak 15 Monitor/Defibrillator',
      'AutoPulse Resuscitation System',
      'Stryker Power-LOAD Cot',
      'SMART Triage Tag Kit',
    ],
    modules: [
      {
        id: 'ems-orientation',
        name: 'EMS Station Orientation',
        summary: 'Understand EMS operations, crew structure, and station layout.',
        shiftFocus: 'mixed',
        estimatedDuration: 'Half day',
        competencies: [
          'Explain EMS duty cycle and activation flow.',
          'Demonstrate familiarity with crash call locations.',
          'Identify station emergency equipment staging points.',
        ],
        tasks: [
          {
            id: 'ems-orientation-brief',
            title: 'Mentor Brief & Expectations',
            description: 'Meet with assigned mentor to review onboarding roadmap and expectations.',
            duration: '45 min',
            objective: 'Align on onboarding goals and clarify reporting relationships.',
            requiresMentor: true,
          },
          {
            id: 'ems-station-tour',
            title: 'Guided Station Tour',
            description:
              'Walk through ambulance bay, medical stores, decontamination room, and rest quarters.',
            duration: '1 hr',
            objective: 'Build spatial awareness and locate key EMS assets quickly.',
            prerequisites: ['ems-orientation-brief'],
          },
          {
            id: 'ems-systems-access',
            title: 'System Access & Logins',
            description:
              'Set up access to ePCR, ProQA, and station duty roster systems with IT facilitator.',
            duration: '30 min',
            objective: 'Ensure readiness to document cases and receive dispatch information.',
          },
        ],
      },
      {
        id: 'ems-clinical',
        name: 'Clinical Protocols Immersion',
        summary: 'Refresh critical interventions and local protocols for high-acuity cases.',
        shiftFocus: 'day',
        estimatedDuration: '2 days',
        competencies: [
          'Apply SCDF-specific medication administration protocols.',
          'Perform HAZMAT patient handling procedures.',
          'Deliver structured handovers to receiving hospitals.',
        ],
        tasks: [
          {
            id: 'ems-protocol-review',
            title: 'Protocol Review Workshop',
            description: 'Interactive review of cardiac, trauma, and paediatric care protocols.',
            duration: '4 hrs',
            objective: 'Reinforce decision pathways and identify station-specific adjustments.',
            resources: [
              {
                id: 'protocol-slides',
                title: 'SCDF EMS Protocol Slides',
                description: 'Deck summarising all high-risk interventions.',
                type: 'document',
              },
            ],
          },
          {
            id: 'ems-simulation-lab',
            title: 'Simulation Lab Scenarios',
            description:
              'Two high-fidelity simulations covering cardiac arrest and MCI triage with debriefs.',
            duration: '1 day',
            objective: 'Translate clinical protocols into realistic station scenarios.',
            prerequisites: ['ems-protocol-review'],
          },
          {
            id: 'ems-hospital-attachment',
            title: 'A&E Attachment',
            description:
              'Half-day observer attachment with SGH A&E to follow through on patient handovers.',
            duration: '4 hrs',
            objective: 'Appreciate hospital expectations and refine clinical documentation.',
          },
        ],
      },
      {
        id: 'ems-operations',
        name: 'Ambulance Operations',
        summary: 'Gain confidence in apparatus checks, driving policy, and rapid deployment drills.',
        shiftFocus: 'night',
        estimatedDuration: '1.5 days',
        competencies: [
          'Complete pre-shift ambulance readiness checks.',
          'Execute Code Red dispatch workflow under 8 minutes.',
          'Coordinate with FRS crews during integrated incidents.',
        ],
        tasks: [
          {
            id: 'ems-apparatus-check',
            title: 'Ambulance Apparatus Checklist',
            description: 'Hands-on checklist covering medical inventory, vehicle systems, and PPE.',
            duration: '2 hrs',
            objective: 'Ensure frontline readiness of ambulance resources each shift.',
            resources: [
              {
                id: 'apparatus-checklist',
                title: 'AMB 37 Daily Checklist',
                description: 'Printable checklist for daily apparatus inspections.',
                type: 'checklist',
              },
            ],
          },
          {
            id: 'ems-driving-policy',
            title: 'Emergency Driving Policy Brief',
            description: 'Review EVOC policy, liability considerations, and station routing nuances.',
            duration: '1.5 hrs',
            objective: 'Apply safe driving practices tailored to Central Fire Station response areas.',
          },
          {
            id: 'ems-integrated-drill',
            title: 'Joint EMS/FRS Response Drill',
            description:
              'Night drill focusing on fireground medical staging and casualty extraction coordination.',
            duration: '3 hrs',
            objective: 'Practise seamless integration with FRS crews during high tempo incidents.',
            prerequisites: ['ems-apparatus-check', 'ems-driving-policy'],
            resources: [
              {
                id: 'integrated-sop',
                title: 'Integrated Incident SOP',
                description: 'Procedures for unified command between EMS and FRS.',
                type: 'document',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'frs',
    title: 'Fire & Rescue Services',
    mission:
      'Protect life and property through firefighting excellence, rescue mastery, and hazard mitigation.',
    overview:
      'FRS onboarding introduces you to Central Fire Station’s operational tempo, equipment cache, and crew drills that underpin rapid fireground deployment.',
    color: '#FF3B30',
    stationContacts: [
      { name: 'CPT Rachel Koh', role: 'FRS Mentor', phone: '+65 8128 8899' },
      { name: 'SSG Daniel Chong', role: 'Watch Commander', phone: '+65 8127 3344' },
    ],
    keyEquipment: [
      'Compressed Air Foam System (CAFS)',
      '32m Combined Platform Ladder',
      'Breathing Apparatus Control Board',
      'Holmatro Rescue Tools',
    ],
    modules: [
      {
        id: 'frs-watch-integration',
        name: 'Watch Integration',
        summary: 'Integrate into watch routines, command hierarchy, and station discipline.',
        shiftFocus: 'mixed',
        estimatedDuration: '1 day',
        competencies: [
          'Execute watch change parade and duty handovers.',
          'Identify roles within the watch crew and reporting chain.',
          'Demonstrate awareness of station emergency alerts and triggers.',
        ],
        tasks: [
          {
            id: 'frs-watch-brief',
            title: 'Watch Commander Brief',
            description: 'Introduce yourself to the watch, review expectations, and crew pairing.',
            duration: '1 hr',
            objective: 'Align on watch culture, communication norms, and safety priorities.',
            requiresMentor: true,
          },
          {
            id: 'frs-parade-drill',
            title: 'Morning Parade Drill',
            description:
              'Participate in parade with focus on apparatus presentation and uniform standards.',
            duration: '1 hr',
            objective: 'Internalise watch discipline and inspection standards.',
          },
          {
            id: 'frs-alert-systems',
            title: 'Alert Systems Orientation',
            description:
              'Familiarise with turnout bells, station PA, and mobilisation workflows.',
            duration: '45 min',
            objective: 'Respond to alerts with minimal delay and error.',
          },
        ],
      },
      {
        id: 'frs-fireground',
        name: 'Fireground Operations',
        summary: 'Sharpen tactical deployment, ventilation, and high-rise firefighting tactics.',
        shiftFocus: 'night',
        estimatedDuration: '2 days',
        competencies: [
          'Deploy hose lines and ladders within SCDF response benchmarks.',
          'Operate in Breathing Apparatus teams with accountability.',
          'Coordinate with EMS medical staging during evolving incidents.',
        ],
        tasks: [
          {
            id: 'frs-ba-refresh',
            title: 'Breathing Apparatus Refresher',
            description: 'Skills refresher on donning, entry control board usage, and emergency signals.',
            duration: '3 hrs',
            objective: 'Ensure safe operations in IDLH environments.',
            resources: [
              {
                id: 'ba-quickref',
                title: 'BA Quick Reference Guide',
                description: 'Laminate card covering critical BA protocols.',
                type: 'document',
              },
            ],
          },
          {
            id: 'frs-highrise-drill',
            title: 'High-Rise Evolution Drill',
            description:
              'Joint drill on staging, stairwell ops, and smoke control in high-rise scenarios.',
            duration: '1 day',
            objective: 'Practise coordinated tactics for high-rise deployments.',
            prerequisites: ['frs-ba-refresh'],
          },
          {
            id: 'frs-afad-mop-up',
            title: 'After-Action Review',
            description:
              'Conduct AAR covering decision logs, communication loops, and improvement items.',
            duration: '2 hrs',
            objective: 'Embed continuous learning culture post-incident.',
            requiresMentor: true,
          },
        ],
      },
      {
        id: 'frs-specialist',
        name: 'Specialist Rescue & Support',
        summary: 'Familiarise with specialist equipment and inter-agency coordination.',
        shiftFocus: 'day',
        estimatedDuration: '1.5 days',
        competencies: [
          'Deploy Holmatro hydraulic systems for vehicle extrication.',
          'Support HazMat branch operations with decon corridor setup.',
          'Engage SCDF Ops Centre during large-scale incidents.',
        ],
        tasks: [
          {
            id: 'frs-extrication-lab',
            title: 'Vehicle Extrication Lab',
            description:
              'Hands-on practice with rescue tools, step-cribs, and casualty packaging.',
            duration: '4 hrs',
            objective: 'Build proficiency with SCDF rescue tool cache.',
          },
          {
            id: 'frs-hazmat-brief',
            title: 'HazMat Support Briefing',
            description:
              'Walk-through of HazMat branch support roles and decontamination corridor SOP.',
            duration: '2 hrs',
            objective: 'Ensure readiness to augment HazMat operations when tasked.',
            resources: [
              {
                id: 'hazmat-sop',
                title: 'HazMat Support SOP',
                description: 'Procedures for warm zone setup and casualty tracking.',
                type: 'document',
              },
            ],
          },
          {
            id: 'frs-ops-centre-visit',
            title: 'Ops Centre Attachment',
            description:
              'Half-day attachment with Ops Centre duty team to understand incident escalation.',
            duration: '4 hrs',
            objective: 'Appreciate strategic coordination during complex incidents.',
          },
        ],
      },
    ],
  },
];
