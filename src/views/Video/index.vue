<template>
    <div class="video">
        <div class="videoSet" v-if="state">
            <div class="videoSet-one">
                <el-form class="title_add" ref="ruleForm" label-position="center" label-width="auto">
                    <el-form-item label="视频名称">
                        <el-input v-model="videoname"></el-input>
                    </el-form-item>
                    <el-form-item class="title_form_item_content">
                        <el-button type="primary" @click="succe('ruleForm')">确认</el-button>
                        <el-button @click="cancle('ruleForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="left">
            <h3>视屏目录</h3>
            <el-tree :data="data" :props="defaultProps" @node-click="searchVideo" accordion> </el-tree>
        </div>

        <div class="right">
            <h3>视屏管理</h3>
            <el-table :data="video" style="width: 100%">
                <el-table-column prop="id"   label="视频编号" width="auto">
                </el-table-column>
                <el-table-column prop="name" label="视频名字" width="auto">
                </el-table-column>
                <el-table-column prop="create_time" label="创建日期">
                </el-table-column>
                <el-table-column prop="update_time" label="更新日期">
                </el-table-column>

                <el-table-column label="视屏操作">
                    <template slot-scope="scope">
                        <span size="mini" class="work" @click="handleEdit(scope.$index, scope.row)">观看</span>
                        <span size="mini" class="work" @click="handleChange(scope.$index, scope.row)">更新</span>
                        <span size="mini" class="work" @click="handleDelete(scope.$index, scope.row)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="video-add">
                <el-upload action="http://81.68.121.52:8000/api/chapter_video" :headers="header" :on-change="videoad"
                    :show-file-list="false" name="video" ref="upload" :data="videoh">
                    <div class="video-add">
                        <el-button class="videoAdd">新增视频</el-button>
                    </div>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            data: [],
            videoname: '',
            dataId: '',
            videoh: {},
            file: '',
            defaultProps: {
                children: "children",
                label: "label",
            },
            header: {
                authorization: `Bearer ${this.$store.state.token}`
            },
            video: [],
            state: false,
            stat: false
        };
    },
    created() {
        //第一层大标题14对象
        //第二层 章节14数组每一个数组都要进行重组
        this.$http({
            url: 'api/classify'
        }).then(res => {
            let datas = res.data.data;
            let newArr = [];
            datas.forEach(item => {
                newArr.push(this.$http({
                    url: 'api/chapter',
                    params: {
                        pk: item.id
                    }
                }))
            });
            Promise.all(newArr).then(res => {
                //一次性得到14个数组
                //对14个数组进行重组后丢进childern属性
                //res 是一个二维数组 response里的data的data就是我们想要的数组
                //item 是每一个response
                res.forEach((item, index) => {
                    let arr = [];
                    item.data.data.forEach(item1 => {
                        arr.push({
                            id: item1.id,
                            label: item1.name
                        })
                    })
                    this.data.push({
                        id: datas[index].id,
                        label: datas[index].name,
                        children: arr,
                    })

                })
            })
        });
    },
    methods: {
        searchVideo(data,node) {
            if (!data) { } else {
                this.dataId = data.id;
            }
            this.$http({
                url: `api/chapter_video?pk=${this.dataId}`,
            }).then(res => {
                let response = res.data;
                if (res.status == 'error') {
                    this.$message.error(response.msg);
                }
                else {
                    console.log(response)
                    response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
                    })
                    this.video = response.data;
                }
            }).catch(error => {
                this.$message.error('链接异常');
            })
        },
        videoad(file) {
            this.file = file.raw.name;
            this.dataId = this.dataId.toString();
            this.videoh['name'] = this.file;
            this.videoh['video_permission'] = '1';
            this.videoh['chapter_id'] = this.dataId;
            let result = URL.createObjectURL(file.raw);
            this.imageUrl = result;
            this.$refs.upload.submit();
            this.searchVideo();
        },
        handleEdit(index, row) {
            const dp = new dplayer({
                container: document.getElementById('videoAll'),
                logo: 'i',
                video: {
                    url: 'http://81.68.121.52:9000/api/videoplay?path=' + this.video[index].mp4_url.slice(0, this.video[index].mp4_url.indexOf('.'))
                }
            });
        },
        handleDelete(index, row) {
            console.log(index, row)
            this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning' 
            }).then(() => {
                this.$http({
                    url: 'api/chapter_video',
                    method: 'DELETE',
                    data: `pk=${row.id}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.status == 'error') {
                        this.$message.error(res.data.msg);
                    } else {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.searchVideo();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleChange(index, row) {
            this.row = row;
            this.state = true;
        },
        succe() {
            console.log(this.row)
            this.$http({
                url: 'api/chapter_video',
                method: 'PUT',
                data: `pk=${this.row.id}?name=${this.videoname}?chapter_id=${this.row.chapter_id}`,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                if (res.data.status == 'error') {
                    this.$message.error(res.data.msg);
                } else {
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    });
                    this.searchVideo();
                    this.cancle();
                }
            }).catch(error => {
                this.$message.error('连接异常')
            })
        },
        cancle() {
            this.state = false;
        }
    }
}
</script>

<style scoped>
.video {
    display: flex;
    justify-content: space-between;
}

.left {
    width: 23%;
    height: 40px;
    background-color: rgb(48, 65, 86);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.right h3 {
    margin: 0;
    line-height: 40px;
    color: #fff;
    text-align: center;
}

.right {
    width: 23%;
    height: 40px;
    background-color: rgb(48, 65, 86);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.left h3 {
    margin: 0;
    line-height: 40px;
    color: #fff;
    text-align: center;
}

.right {
    width: 72%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.video-add {
    margin-top: 5px;
    float: right;
    height: 40px;
}

.videoAdd {
    float: right;
    border-radius: 3px;
    background-color: rgb(48, 65, 86);
    color: #fff;
}

.work:hover {
    color: aqua;
}

.video .work {
    margin: 0 3px;
}

.videoSet {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 5;
}

.videoSet-one {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
}
</style>