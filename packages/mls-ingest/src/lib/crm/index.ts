import { create } from './properties'; // Importing the create function from the properties module.

/**
 * The `crm` object serves as a namespace that groups CRM-related functionalities.
 * Currently, it includes operations related to properties, such as creating a new property
 * in the CRM system. This structured approach allows for easy extension of the CRM
 * functionalities with additional operations and entities in the future.
 */
export const crm = {
  properties: {
    create, // Exposing the create function under the properties namespace.
  },
};

export default crm;
