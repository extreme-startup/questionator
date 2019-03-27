<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in columns">{{column}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data">
                <td v-for="item in row">{{item}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      columns: Array,
      data: Array
    }
  };
</script>
