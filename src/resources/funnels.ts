// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Funnels extends APIResource {}

/**
 * A Funnel represents a series of steps used to track progression.
 */
export interface Funnel {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * An ordered list of `FunnelStep` objects that make up the funnel.
   */
  steps: Array<FunnelStep>;

  /**
   * String representing the object’s type. Always `funnel` for this object.
   */
  type: 'funnel';
}

/**
 * Represents a single step within a `Funnel`.
 */
export interface FunnelStep {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The name of the step.
   */
  name: string;

  /**
   * The type of step, which can be `active`, `success`, or `failure`.
   */
  step_type: 'active' | 'success' | 'failure';

  /**
   * String representing the object’s type. Always `funnel_step` for this object.
   */
  type: 'funnel_step';
}

export declare namespace Funnels {
  export { type Funnel as Funnel, type FunnelStep as FunnelStep };
}
