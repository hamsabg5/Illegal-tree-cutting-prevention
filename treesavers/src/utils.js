import PersonIMG from "assets/Person.svg";

export const getProfileImg = (rawDataPhoto) => {
  let profileImg;
  if (rawDataPhoto) {
    //if rawData really has photo
    profileImg = rawDataPhoto;
  } else {
    profileImg = PersonIMG;
  }

  return profileImg;
};

export const projName = "TreeSavers";
