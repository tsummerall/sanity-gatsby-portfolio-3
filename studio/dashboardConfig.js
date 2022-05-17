export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
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
                  buildHookId: '628401dcaf45f412049418bd',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-3-studio-x9xzz3i7',
                  apiId: '67ecfacd-3e2c-45e1-a171-8b7b3cee6995'
                },
                {
                  buildHookId: '628401dcdcad68114ecdec2a',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-3-web-1k9ydnb6',
                  apiId: 'e2be9525-44db-4c36-80b0-34169b2af333'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tsummerall/sanity-gatsby-portfolio-3',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-3-web-1k9ydnb6.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
