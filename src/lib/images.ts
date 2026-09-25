import { asset } from "@/lib/utils";

/** Local home-care photography. Paths include the Vite base so they load in every environment. */
export const IMAGES = {
  nurseHome: asset("/photos/nurse-home.jpg"),
  ptHome: asset("/photos/pt-home.jpg"),
  familySmile: asset("/photos/family.jpg"),
  skilledNursing: asset("/services/skilled-nursing.png"),
  homeHealthAide: asset("/services/home-health-aide.png"),
  physicalTherapy: asset("/services/physical-therapy.png"),
  occupationalTherapy: asset("/services/occupational-therapy.jpg"),
  teamNurse: asset("/photos/team-nurse.jpg"),
  teamAide: asset("/photos/team-aide.jpg"),
  teamPt: asset("/photos/team-pt.jpg"),
  teamOt: asset("/photos/team-ot.jpg"),
  heroCare: asset("/photos/hero.jpg"),
  areaWorcester: asset("/photos/nurse-home.jpg"),
  areaBoston: asset("/photos/team-nurse.jpg"),
  areaLowell: asset("/photos/clinic.jpg"),
  areaSpringfield: asset("/photos/family.jpg"),
  massachusetts: asset("/massachusetts-light.jpg"),
} as const;
