import { h } from 'vue'
import type { IconSet, IconProps } from 'vuetify'
import topWaves from '../icons/topWaves.vue'
import logo from '../icons/logo.vue'
import bottomWaves from '../icons/bottomWaves.vue'
import mockupLock from '../icons/mockupLock.vue'
import arrowLeft from '../icons/arrowLeft.vue'

const customSvgNameToComponent: any = {
  topWaves,
  bottomWaves,
  logo,
  mockupLock,
  arrowLeft,
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };