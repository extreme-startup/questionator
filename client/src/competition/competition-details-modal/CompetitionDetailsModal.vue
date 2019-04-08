<template>
  <ModalWrapper>
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Add new training</ModalTitle>
      </ModalHeader>
      <ModalCloseButton v-on:click="close">✖</ModalCloseButton>

      <form v-on:submit.prevent.stop="submit">
        <ControlWrapper>
          <ControlLabel for="competition-title-input">
            Title:
          </ControlLabel>
          <input
            v-model="competitionDetails.name"
            v-on:input="changeDetails"
            id="competition-title-input"
            type="text"
          />
          <DetailsFieldError v-if="errors.nameRequired"
            >The name field is required</DetailsFieldError
          >
        </ControlWrapper>

        <ControlWrapper>
          <ControlLabel for="competition-description-input">
            Description:
          </ControlLabel>
          <textarea
            v-model="competitionDetails.description"
            v-on:input="changeDetails"
            id="competition-description-input"
            cols="30"
            rows="10"
          >
          </textarea>
          <DetailsFieldError v-if="errors.descriptionRequired"
            >The description field is required</DetailsFieldError
          >
        </ControlWrapper>

        <ControlWrapper>
          <ControlLabel for="competition-category-select">
            Category:
          </ControlLabel>

          <select name="competition-category" id="competition-category-select"> </select>
        </ControlWrapper>

        <ModalFooter>
          <CancelButton v-on:click="close">Cancel</CancelButton>
          <Button :disabled="!canBeSaved" primary type="submit">Save</Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </ModalWrapper>
</template>

<script>
import { Button } from '@/common/styledComponents';
import {
  CancelButton,
  ControlLabel,
  ControlWrapper,
  DetailsFieldError,
} from './CompetitionDetailsModal.style';
import {
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from './Modal.style';
import { CompetitionDetails } from '../competition-details.model';
import {
  getInitialValidationErrors,
  validateCompetitionDetails,
} from './competition-details-validation';

export default {
  name: 'CompetitionDetailsModal',
  data: component => {
    return {
      initialCompetitionDetails: Object.assign({}, component.competitionDetails),
      canBeSaved: false,
      errors: getInitialValidationErrors(),
    };
  },
  props: {
    competitionDetails: {
      type: CompetitionDetails,
      default: () => new CompetitionDetails(),
      required: false,
    },
  },
  components: {
    CancelButton,
    ControlWrapper,
    ControlLabel,
    DetailsFieldError,

    Button,
    ModalWrapper,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalFooter,
    ModalCloseButton,
  },
  methods: {
    close: function() {
      this.$emit('close', null);
    },

    submit: function() {
      this.$emit('close', this.competitionDetails);
    },

    changeDetails: function() {
      const { canBeSaved, errors } = validateCompetitionDetails(
        this.competitionDetails,
        this.initialCompetitionDetails,
      );

      this.canBeSaved = canBeSaved;
      this.errors = errors;
    },
  },
};
</script>
