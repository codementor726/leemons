const { permissions } = require('./config/constants');
const { find, isEmpty } = require('lodash');
const _ = require('lodash');
const add = require('./src/services/menu-builder/add');

// const { addLocales } = require('./src/services/locales/addLocales');
const { mainMenuItem, widgets } = require('./config/constants');


async function initMenuBuilder() {
  for (let i = 0, l = mainMenuItem.length; i < l; i++) {
    // eslint-disable-next-line no-await-in-loop
    await add(
      mainMenuItem[i],
      mainMenuItem[i].permissions,
      mainMenuItem[i].isCustomPermission
    );
  }
  leemons.events.emit('init-menu');

}

async function events(isInstalled) {

  leemons.events.once(
    ['plugins.menu-builder:init-main-menu', 'plugins.academic-portfolio:init-permissions'],
    async () => {
      await initMenuBuilder();
    }
  );

  leemons.events.once('plugins.admin:init-widget-zones', async () => {
    await Promise.allSettled(
      _.map(widgets.zones, (config) =>
        leemons.getPlugin('widgets').services.widgets.setZone(config.key, {
          name: config.name,
          description: config.description,
        })
      )
    );
    leemons.events.emit('init-widget-zones');
    await Promise.allSettled(
      _.map(widgets.items, (config) =>
        leemons
          .getPlugin('widgets')
          .services.widgets.setItemToZone(config.zoneKey, config.key, config.url, {
            name: config.name,
            description: config.description,
            properties: config.properties,
          })
      )
    );
    leemons.events.emit('init-widget-items');
  });


  if (!isInstalled) {
    leemons.events.once('plugins.users:init-permissions', async () => {
      const usersPlugin = leemons.getPlugin('users');
      await usersPlugin.services.permissions.addMany(permissions);
      leemons.events.emit('init-permissions');
    });


  } else {    

    leemons.events.once('plugins.academic-portfolio:pluginDidInit', async () => {
      leemons.events.emit('init-permissions');
      leemons.events.emit('init-menu');
      leemons.events.emit('init-submenu');
    });
  }
}


module.exports = events;