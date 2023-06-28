import { sleep } from 'k6';


let ENVIRONMENT = {};

ENVIRONMENT.execution = "hlg";
if (__ENV.EXECUTION) {
  ENVIRONMENT.execution = __ENV.EXECUTION;
}

ENVIRONMENT.optionsSet = "smoke";
if (__ENV.OPTIONS_SET) {
  ENVIRONMENT.optionsSet = `.${__ENV.OPTIONS_SET}`;
}

import { PostSolicitar } from './tests/autocaptura/convite-solicitar/post.js';
import { PostValidar } from './tests/autocaptura/convite-validar/post.js';
import { TestsSetup } from './tests/setup.js';
let TESTS = [...PostSolicitar, ...PostValidar];

let optionsFile = `./env/${ENVIRONMENT.execution}/config${ENVIRONMENT.optionsSet}.json`;
export let options = JSON.parse(open(optionsFile));

let DATA = JSON.parse(open(`./env/${ENVIRONMENT.execution}/settings.json`));
DATA.ENVIRONMENT = ENVIRONMENT;

let TESTS_TO_RUN = [];
if (__ENV.TEST_FILTERS) {
  DATA.TEST_FILTERS.enabled = true;
  let tokens = __ENV.TEST_FILTERS.split('|');
  DATA.TEST_FILTERS[tokens[0]] = tokens[1];
}
if (DATA.TEST_FILTERS.enabled) {
  TESTS_TO_RUN = TESTS.filter(t => {

    console.debug(`Test filters. Probing ${t.name}`);

    if (DATA.TEST_FILTERS.startsWith != null &&
      t.name.startsWith(DATA.TEST_FILTERS.startsWith))
      return true;

    if (DATA.TEST_FILTERS.endsWith != null &&
      t.name.endsWith(DATA.TEST_FILTERS.endsWith))
      return true;

    if (DATA.TEST_FILTERS.contains != null &&
      t.name.indexOf(DATA.TEST_FILTERS.contains) != -1)
      return true;

    if (DATA.TEST_FILTERS.regex != null &&
      t.name.match(DATA.TEST_FILTERS.regex))
      return true;
    return false;
  });
} else {
  TESTS_TO_RUN = [...TESTS];
}

export function setup() {
  TestsSetup(DATA);
  return DATA;
}

export default function (data) {
  TESTS_TO_RUN.forEach(t => { t(data); sleep(1); });
  sleep(1);
}