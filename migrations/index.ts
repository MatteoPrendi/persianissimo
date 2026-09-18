import * as migration_20260918_205732_add_reset_password_requested_at from './20260918_205732_add_reset_password_requested_at';

export const migrations = [
  {
    up: migration_20260918_205732_add_reset_password_requested_at.up,
    down: migration_20260918_205732_add_reset_password_requested_at.down,
    name: '20260918_205732_add_reset_password_requested_at'
  },
];
