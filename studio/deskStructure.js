import S from '@sanity/desk-tool/structure-builder'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { GiMountedKnight, GiCardJoker, GiTabletopPlayers } from 'react-icons/gi'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['match', 'tournament', 'tressResults', 'player', 'siteConfig'].includes(listItem.getId())

export const getDefaultDocumentNode = () => {
  // Return all documents with just 1 view: the form
  return S.document().views([
    S.view.form(),
    S.view
      .component(DocumentsPane)
      .options({
        query: `*[!(_id in path("drafts.**")) && references($id)]`,
        params: { id: `_id` },
        useDraft: false,
        debug: true,
      })
      .title('Incoming References')
  ])
}


export default () =>
  S.list()
    .title('Tress')
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
                .icon(GiMountedKnight)
                // This automatically gives it properties from the project type
                .schemaType('tournament')
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList('tournament').title('Tournaments')),
              // Add a second list item
              S.listItem()
                .title('Matches')
                .icon(GiCardJoker)
                // This automatically gives it properties from the project type
                .schemaType('match')
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList('match').title('Matches')),
              // Add a second list item
              S.listItem()
                .title('Players')
                .icon(GiTabletopPlayers)
                .schemaType('player')
                // When you open this list item, list out the documents
                // of the type category"
                .child(S.documentTypeList('player').title('Players')),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('siteConfig'),
        ),
    ])
