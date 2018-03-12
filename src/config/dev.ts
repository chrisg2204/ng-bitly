/**
 * Archivo de configuración.
 * @var Config
 * @type {any}
 */

const Config = {
    
    /**
     * Título.
     * @var TITLE
     * @type {string}
     */
    TITLE: 'Bitly-Clone',
    /**
     * Url del web-service.
     * @var SERVICE_BASE
     * @type {string}
     */
    SERVICE_BASE: 'http://127.0.0.1:9020',
    /**
     * Url de servicios disponibles.
     * @var SERVICE_URL
     * @type {any}
     */
    SERVICE_URL: {
        BASE: '/',
        SHORTEN: '/shorten',

    }

};

export {Config};