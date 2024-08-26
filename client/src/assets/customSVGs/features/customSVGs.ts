import { h } from 'vue'
import type { IconSet, IconProps } from 'vuetify'
import topWaves from '../icons/topWaves.vue'
import logo from '../icons/logo.vue'
import bottomWaves from '../icons/bottomWaves.vue'
import mockupLock from '../icons/mockupLock.vue'
import arrowLeft from '../icons/arrowLeft.vue'
import logout from '../icons/logout.vue'
import userStub from '../icons/userStub.vue'
import ticketCircle from '../icons/ticketCircle.vue'

const customSvgNameToComponent: any = {
  topWaves,
  bottomWaves,
  logo,
  mockupLock,
  arrowLeft,
  logout,
  userStub,
  ticketCircle,
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };