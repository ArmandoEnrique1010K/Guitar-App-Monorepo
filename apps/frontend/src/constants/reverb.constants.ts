import type { ReverbConfig } from "@/schemas";
import { createNumberProperty } from "@/utils/createNumberProperty";

export const REVERB_SCHEMA = {
    decay: createNumberProperty(
        0,
        1,
        0.01,
        0.4,
        100,
        "%",
        0
    ),
    preDelay: createNumberProperty(
        0,
        1,
        0.01,
        1,
        100,
        "%",
        0
    ),

    wet: createNumberProperty(
        0,
        1,
        0.01,
        1,
        100,
        "%",
        0
    ),

};

export const INITIAL_REVERB: ReverbConfig = {
    enabled: false,
    decay: 0.4,
    preDelay: 0,
    wet: 1
};