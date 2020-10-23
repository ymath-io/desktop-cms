<template>
	<div>
	<v-card-title style="color:white">Project Files</v-card-title>
	<v-treeview dark dense
	            :items="$store.state.fileList"
	            activatable
	            hoverable
	            v-model="$store.state.tree"
	            open-on-click
	            @update:open="logit"
	            @update:active="openFile"
	            
	item-key="name">
		<template v-slot:prepend="{ item, open }">
			<v-icon v-if="item.isDir">
				{{ open ? 'mdi-folder-open' : 'mdi-folder' }}
			</v-icon>
			<v-avatar  v-else>
				<v-img max-height="20px" max-width="20px"  src="./../../public/file-icons/racket-logo.svg"/>
			</v-avatar>
		</template>
		<template v-slot:label="{item, leaf}">
			<span @click="$store.state.file = item" >{{item.name}}</span>
		</template>
	</v-treeview>
	</div>
</template>

<script>
	const fs = require('fs');
    export default {
        name: "fileExplorer",
	    methods:{
            openFile(obj){
                //this.$store.state.code = content
	            const theFile = this.$store.state.fileList.filter(function (f) {
					return f.name===obj[0]
                })[0]
	            if (theFile && theFile.content){
	            this.$store.state.file = theFile
		            //console.log(this.$store.state.file)
	            }
            },
		    logit(h){
                //console.log(h)
		    }
	    }
    }
</script>

<style scoped>

</style>
