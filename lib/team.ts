// lib/team.ts

export type TeamMember = {
  nameKey: string;
  roleKey: string;
  bioKey: string;
  imageSrc: string;
};

export const TEAM: readonly TeamMember[] = [
  {
    nameKey: "team.members.0.name",
    roleKey: "team.members.0.role",
    bioKey: "team.members.0.bio",
    imageSrc: "/images-team/ivanova-photo.png",
  },
  {
    nameKey: "team.members.1.name",
    roleKey: "team.members.1.role",
    bioKey: "team.members.1.bio",
    imageSrc: "/images-team/petrov-photo.png",
  },
  {
    nameKey: "team.members.2.name",
    roleKey: "team.members.2.role",
    bioKey: "team.members.2.bio",
    imageSrc: "/images-team/sidorova-photo.png",
  },
];
