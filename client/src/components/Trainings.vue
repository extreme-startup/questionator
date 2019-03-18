<template>
  <styled-title>
    Trainings
    <styled-button>Add new training</styled-button>
  </styled-title>
</template>

<script>
import styledComponents from '../common/styledComponents';

export default {
  name: 'Trainings',
  components: {
    'styled-button': styledComponents.StyledButton,
    'styled-title': styledComponents.StyledTitle,
  },
};
</script>
