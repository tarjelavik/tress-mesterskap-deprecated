// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import match from './documents/match'
import tournament from './documents/tournament'
import page from './documents/page'
import player from './documents/player'
import route from './documents/route'
import siteConfig from './documents/siteConfig'

import embedHTML from './objects/embedHTML'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'
import textSection from './objects/textSection'
import playerResult from './objects/playerResult'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Documents
    match,
    tournament,
    page,
    player,
    route,
    siteConfig,
    // Objects
    embedHTML,
    figure,
    internalLink,
    link,
    playerResult,
    portableText,
    simplePortableText,
    textSection
  ])
})
