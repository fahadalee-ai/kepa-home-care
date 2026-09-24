const u = (id: string, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85${extra}`;

/** Hi-res home-care photography for KEPA screens. */
export const IMAGES = {
  nurseHome: u("photo-1576765608535-5f04d1e3f289"),
  ptHome: u("photo-1571019614242-c5c5dee9f50b", "&sat=-20"),
  familySmile: u("photo-1581579438747-1dc8d17bbce4"),
  skilledNursing: "/services/skilled-nursing.png",
  homeHealthAide: "/services/home-health-aide.png",
  physicalTherapy: "/services/physical-therapy.png",
  occupationalTherapy: "/services/occupational-therapy.jpg",
  teamNurse: u("photo-1559839734-2b71ea197ec2"),
  teamAide: u("photo-1582750433449-648ed127bb54"),
  teamPt: u("photo-1612349317150-e413f6a5b16d"),
  teamOt: u("photo-1594824476967-48c8b964273f"),
  heroCare: u("photo-1576765607924-3f7b8410a787"),
  areaWorcester: u("photo-1576765608535-5f04d1e3f289"),
  areaBoston: u("photo-1559839734-2b71ea197ec2"),
  areaLowell: u("photo-1576091160399-112ba8d25d1d"),
  areaSpringfield: u("photo-1581579438747-1dc8d17bbce4"),
} as const;
