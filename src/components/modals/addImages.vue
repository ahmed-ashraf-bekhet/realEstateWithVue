<template>
  <div class="modal" tabindex="-1" id="add_images_modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Or More Images & Features</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
              <input
                v-model="imagesNum"
                type="number"
                class="form-control"
                placeholder="Num Of Wanted Images?"
              />
            </div>
            <button @click="confirmNum" class="btn btn-primary mb-2">
              Confirm Number
            </button>
            <div class="col-12" v-for="n in imagesArr" :key="n.id">
              <div class="form-group">
                <input
                  @change="fileSelect(n.id, $event)"
                  type="file"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            @click="addImages"
            v-if="confirmFlag"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addImages",
  props:["propID"],
  data: function() {
    return {
      imagesArr: [],
      imagesNum: "",
      confirmFlag: false,
    };
  },
  mounted(){
      console.log(this.propID)
  },
  methods: {
    fileSelect(id, event) {
      console.log(event.target.files[0]);
      this.imagesArr[id].value = event.target.files[0];
    },
    confirmNum() {
      console.log("dsa");
      if (this.imagesNum > 0) {
        this.confirmFlag = true;
      }
      this.imagesArr = [];
      for (let i = 0; i < this.imagesNum; i++) {
        this.imagesArr[i] = { id: i, value: "" };
      }
    },
    addImages() {
      const myForm = new FormData();
      for (let i = 0; i < this.imagesNum; i++) {
        myForm.append(
          `image${i+1}`,
          this.imagesArr[i].value
        );
      }
      myForm.append("num", this.imagesNum);
      axios.post("https://festive-exchanges.000webhostapp.com/api/uploadImages",myForm)
      .then((res)=>{
          console.log(res)
          let lst = res.data;
          console.log(this.propID)
          console.log(this.imagesNum)
          let data = {
            "propid":this.propID,
            "num":this.imagesNum,
          }
          for (let i = 0; i < this.imagesNum; i++) {
            data[`image${i+1}`] = lst[i];
          }
          console.log(data)
          axios.post("https://infinite-sierra-61577.herokuapp.com/api/image",data)
          .then((result)=>{
              console.log(result)
          })
          .catch((err)=>{
              console.log(err)
          })
      })
      .catch((errror)=>{
          console.log(errror)
      })
    },
  },
};
</script>
