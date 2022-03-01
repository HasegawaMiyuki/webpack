import { classToggle } from "./module/toggle.js";
import { autoSwiper } from "./module/autoSwiper.js";
import { loading } from "./parts/loading.js";
import { breakpoint } from "./parts/breakpoint.js";
import "../style/index.scss";

breakpoint();
classToggle();
autoSwiper();
loading();
