<template lang="html">
  <div class="template-container">
    <vs-row>
      <vs-col vs-w="2">
        <div class="parentx-static">
          <vs-sidebar
            v-model="active"
            static-position
            spacer
            default-index="1"
            color="primary"
            class="sidebarx">
            <div
              slot="header"
              class="header-sidebar">
              <vs-avatar
                size="70px"
                src="https://randomuser.me/api/portraits/men/85.jpg"/>
              <h4>My Name</h4>
            </div>

            <vs-sidebar-item
              index="1"
              icon="grade"
              to="/favoritos/artistas">
              Artistas
            </vs-sidebar-item>

            <vs-sidebar-item
              index="2"
              icon="album"
              to="/favoritos/albums">
              Albums
            </vs-sidebar-item>

            <vs-sidebar-item
              index="3"
              icon="music_note"
              to="/favoritos/musicas">
              Musicas
            </vs-sidebar-item>
          </vs-sidebar>
        </div>
      </vs-col>
      <vs-col vs-w="10">
        <router-view/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
  }),
};
</script>

<style scoped lang="scss">
.parentx-static {
  overflow: hidden;
  height: 500px;
  position: relative;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
