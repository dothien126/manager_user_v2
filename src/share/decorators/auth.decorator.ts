import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { JwtGuard } from "src/auth/guards/jwt.guard";

export function Auth(...roles: Role[]) {
  
  return applyDecorators(
    UseGuards(JwtGuard, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth(),
  )
}
