<template>
  <v-flex>
    <v-row>
      <template v-for="(item, i) in items" :key="i">
        <v-col height="100%" class="d-flex">
          <ProjectCard 
              :title="item.name" 
              :image-src="item.image" 
              :id="item.id"
              :card-items="item.card_items"
              @deleteproject="onDeleteProject">
          </ProjectCard>
        </v-col>
      </template>
    </v-row>
  </v-flex>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { getProjects, deleteProject } from '@/requests/projects_requests.js';
import { Notifier } from '@/notifier/notifier'

const items = ref(null)

onBeforeMount(() => {
  let notifier = Notifier.getInstance()
  notifier.enable(true)
  notifier.addVisibleChangeCallback(onReloadProjects)
  onReloadProjects()
})

function onDeleteProject(projectId) {
  deleteProject(projectId).then(response => {
    console.log("Delete project respones=", response)
    onReloadProjects()
  })
}

function onReloadProjects() {
  getProjects().then(response => {
    let array = response.data.map(x => { return { name: x.project_name, image: x.project_image, 
        id: x.project_id, card_items: x.card_items } })
    array.sort((a,b)=>a.id-b.id)
    items.value = array
  })

}
</script>
