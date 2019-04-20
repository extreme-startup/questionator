<template>
  <span>
    <v-dialog v-model="dialog" max-width="600px">
      <form v-on:submit.prevent.stop="submit">
        <v-card>
          <v-card-title>
            <span class="headline">Add new training</span>
            <ModalCloseButton v-on:click="close">✖</ModalCloseButton>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <ControlWrapper>
                    <v-text-field
                      label="Title:"
                      v-model="competitionDetails.name"
                      v-on:input="changeDetails"
                      id="competition-title-input"
                    >
                    </v-text-field>

                    <DetailsFieldError v-if="errors.nameRequired"
                      >The name field is required</DetailsFieldError
                    >
                  </ControlWrapper>
                </v-flex>

                <v-flex>
                  <ControlWrapper>
                    <v-textarea
                      label="Description:"
                      v-model="competitionDetails.description"
                      v-on:input="changeDetails"
                      id="competition-description-input"
                      cols="30"
                      rows="10"
                    >
                    </v-textarea>
                    <DetailsFieldError v-if="errors.descriptionRequired"
                      >The description field is required</DetailsFieldError
                    >
                  </ControlWrapper>
                </v-flex>
              </v-layout>
            </v-container>

            <v-flex>
              <small>*indicates required field</small>
            </v-flex>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat v-on:click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!canBeSaved" type="submit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </span>
</template>

<script>
import { ControlWrapper, DetailsFieldError } from './CompetitionDetailsModal.style';
import { ModalCloseButton } from './Modal.style';
import { CompetitionDetails } from '../competition-details.model';
import {
  getInitialValidationErrors,
  validateCompetitionDetails,
} from './competition-details-validation';

export default {
  name: 'CompetitionDetailsModal',
  data: component => {
    return {
      dialog: true,
      initialCompetitionDetails: Object.assign({}, component.competitionDetails),
      canBeSaved: false,
      errors: getInitialValidationErrors(),
    };
  },
  watch: {
    dialog: function(val) {
      if (!val) {
        this.$emit('close', null);
      }
    },
  },
  props: {
    competitionDetails: {
      type: CompetitionDetails,
      default: () => new CompetitionDetails(),
      required: false,
    },
  },
  components: {
    ControlWrapper,
    DetailsFieldError,
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
