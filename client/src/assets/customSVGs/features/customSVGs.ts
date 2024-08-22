import { h } from "vue";
import type { IconSet, IconProps } from "vuetify";
import wavesIcon from "../icons/wavesIcon.vue";

const customSvgNameToComponent: any = {
  wavesIcon
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };