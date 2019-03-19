<template>
  <styled-title>
    Trainings
    <styled-button>Add new training</styled-button>
  </styled-title>
</template>

<script>
import { Button, Title } from '../common/styledComponents';

export default {
  name: 'Trainings',
  components: {
    'styled-button': Button,
    'styled-title': Title,
  },
};
</script>
