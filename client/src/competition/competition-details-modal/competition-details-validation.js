export function validateCompetitionDetails(competitionDetails, initialCompetitionDetails) {
  const isNameFilled = competitionDetails.name;
  const isDescriptionFilled = competitionDetails.description;
  const isFilled = isNameFilled && isDescriptionFilled;

  const isNameChanged = initialCompetitionDetails.name !== competitionDetails.name;
  const isDescriptionChanged =
    initialCompetitionDetails.description !== competitionDetails.description;

  const canBeSaved = !!isFilled && !!(isNameChanged || isDescriptionChanged);

  return {
    canBeSaved,
    errors: { nameRequired: !isNameFilled, descriptionRequired: !isDescriptionFilled },
  };
}

export function getInitialValidationErrors() {
  return { nameRequired: false, descriptionRequired: false };
}
