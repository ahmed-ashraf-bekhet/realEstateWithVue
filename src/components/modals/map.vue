<template>
  <div class="modal" tabindex="-1" id="map_modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add/Update Your Property Position</h5>
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
          <div id="mapp" style="width: 100%; height: 500px;">

          </div>
        </div>
        <div class="modal-footer">
          <button id="saveMap" type="button" class="btn btn-primary">
            Save Changes
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "maap",
  data:function(){
    return {

    }
  }  
};
</script>
