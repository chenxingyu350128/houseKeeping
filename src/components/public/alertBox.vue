<template>
  <v-dialog persistent class="alertBox-cpnt" v-model="showIt" max-width="290">
    <v-card class="pa-2">
      <v-card-text class="d-flex flex-column align-center py-2">
				<v-img width="83" height="59" src="../../assets/img/innerDialog.png"></v-img>
        <span class="pt-2">{{title}}</span>

      </v-card-text>
      <v-card-actions class="d-flex">
        <v-btn depressed dark outlined class="flex-fill" color="primary"  @click="$emit('cancel')">取消</v-btn>
        <v-btn depressed dark class="flex-fill " color="primary"  @click="$emit('certain')">确定</v-btn>
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
