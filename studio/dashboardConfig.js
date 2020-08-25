export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f3970b7fb8f787548f53942',
                  title: 'Sanity Studio',
                  name: 'tress-mesterskap-studio',
                  apiId: '2ce4a6cf-90c0-4d94-9cdc-c73c5f7b05b1'
                },
                {
                  buildHookId: '5f3970b7ac0d498dc6192180',
                  title: 'Landing pages Website',
                  name: 'tress-mesterskap',
                  apiId: '8fd97f69-4207-4eac-a369-0aed9b3d5555'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tarjelavik/tress-mesterskap',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://tress-mesterskap.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
