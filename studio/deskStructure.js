import S from '@sanity/desk-tool/structure-builder'
import { MdDashboard, MdSettings } from 'react-icons/lib/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['match', 'tournament', 'tressResults', 'player', 'siteConfig'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        // Give it a title
        .title('Tress')
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title('Tress')
            .items([
              // Add the first list item
              S.listItem()
                .title('Tournaments')
                // This automatically gives it properties from the project type
                .schemaType('tournament')
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList('tournament').title('Tournaments')),
              // Add a second list item
              S.listItem()
                .title('Matches')
                // This automatically gives it properties from the project type
                .schemaType('match')
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList('match').title('Matches')),
              // Add a second list item
              S.listItem()
                .title('Players')
                .schemaType('player')
                // When you open this list item, list out the documents
                // of the type category"
                .child(S.documentTypeList('player').title('Players'))
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('siteConfig')
        )
    ])
