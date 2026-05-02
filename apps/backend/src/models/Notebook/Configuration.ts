import {
  defaultAutoMute,
  defaultAutoMuteDelayMs,
  defaultHoldToPlay,
  defaultLockOpenString,
  defaultLoopIntervalMs,
  defaultLoopMode,
  defaultMuteOnDifferentString,
  defaultMuteOnSameString,
  defaultRootChord,
  defaultStringOrder,
  defaultVolume,
} from "constants/configurations";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGuitarBehaviorSchema extends Document {
  volume: number;
  holdToPlay: boolean;
  muteOnSameString: boolean;
  muteOnDifferentString: boolean;
}

export interface IPlaybackSettingsSchema extends Document {
  loopMode: number;
  loopIntervalMs: boolean;
  autoMute: boolean;
  autoMuteDelayMs: boolean;
}

export interface IVisualMappingSchema extends Document {
  rootChord: number;
  lockOpenString: boolean;
  stringOrder: Array<number>;
}

export interface IConfiguration extends Document {
  name: string;
  notebook: Types.ObjectId;
  guitar: Types.ObjectId;
  guitarBehavior: IGuitarBehaviorSchema;
  playbackSettings: IPlaybackSettingsSchema;
  visualMapping: IVisualMappingSchema;
}

// CORE, todo el contenido embebido esta aqui, no se trata de entidades relacionadas 1 a 1
const GuitarBehaviorSchema = new Schema(
  {
    volume: { type: Number, default: defaultVolume },
    holdToPlay: { type: Boolean, default: defaultHoldToPlay },
    muteOnSameString: { type: Boolean, default: defaultMuteOnSameString },
    muteOnDifferentString: {
      type: Boolean,
      default: defaultMuteOnDifferentString,
    },
  },
  { _id: false },
);

const PlaybackSettingsSchema = new Schema(
  {
    loopMode: { type: Boolean, default: defaultLoopMode },
    loopIntervalMs: { type: Number, default: defaultLoopIntervalMs },
    autoMute: { type: Boolean, default: defaultAutoMute },
    autoMuteDelayMs: { type: Number, default: defaultAutoMuteDelayMs },
  },
  { _id: false },
);

const VisualMappingSchema = new Schema(
  {
    rootChord: { type: Number, default: defaultRootChord },
    lockOpenString: { type: Boolean, default: defaultLockOpenString },

    // Arreglo de numeros
    stringOrder: {
      type: [Number],
      default: defaultStringOrder,
    },
  },
  { _id: false },
);

const configurationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notebook: {
    type: Types.ObjectId,
    ref: "Notebook",
  },
  guitar: {
    type: Types.ObjectId,
    ref: "Guitar",
  },
  guitarBehavior: GuitarBehaviorSchema,
  playbackSettings: PlaybackSettingsSchema,
  visualMapping: VisualMappingSchema,
});

const Configuration = mongoose.model<IConfiguration>(
  "Configuration",
  configurationSchema,
);
export default Configuration;
