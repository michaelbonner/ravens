// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import goldBar from './goldBar'
import platformPayloadTable from './platformPayloadTable'
import cameraPayloadTable from './cameraPayloadTable'
import lensesPayloadTable from './lensesPayloadTable'

import project from './project'
import projects from './projects'
import home from './home'
import about from './about'
import person from './person'
import services from './services'
import servicesPage from './services-page'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    project,
    projects,
    home,
    about,
    services,
    servicesPage,
    person,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    goldBar,
    platformPayloadTable,
    cameraPayloadTable,
    lensesPayloadTable,
  ]),
})
