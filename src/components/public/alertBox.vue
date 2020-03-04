<template>
  <v-dialog persistent class="alertBox-cpnt" v-model="showIt" max-width="290">
    <v-card class="pa-2 teal lighten-4">
      <v-card-text class="d-flex flex-column align-center">
				<v-img class="mb-2" width="83" height="59" src="../../assets/img/innerDialog.png"></v-img>
        {{title}}
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-btn depressed dark outlined class="flex-fill" color="primary darken-1"  @click="$emit('cancel')">取消</v-btn>
        <v-btn depressed dark class="flex-fill " color="primary darken-1"  @click="$emit('certain')">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    showIt:{
      type: Boolean,
      default: false
    },
  }
}
</script>
<style lang="scss">
.alertBox-cpnt{
  z-index: 9999;
}
</style>
