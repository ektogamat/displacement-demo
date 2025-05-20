import { proxy } from "valtio";

const state = proxy({ hover: false });

export { state };
