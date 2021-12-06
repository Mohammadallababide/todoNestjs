import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const ROLES_KEY = 'required_roles';
export const SetRequiredRoles = (roles: [Role]) =>
  SetMetadata(ROLES_KEY, ...roles);
