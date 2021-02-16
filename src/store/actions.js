import { logout } from "../network/user";
import { LOGOUT, SETINDEX, SETLIST, SETSONG } from "./mutations-types";
import { getSongDetail } from "../network/player";
import { Song } from "../network/types";

export default {
  storeLogout(context) {
    logout().then(() => {
      context.commit(LOGOUT)
    })
  },
  play(context, payload) {
    let song = null;
    // console.log(payload);
    getSongDetail(payload.list[payload.index].id).then(res => {
      // console.log(res);
      song = new Song({
        url: res[0].data.data[0].url,
        name: res[1].data.songs[0].name,
        id: res[1].data.songs[0].id,
        img: res[1].data.songs[0].al.picUrl,
        alId: res[1].data.songs[0].al.id,
        alName: res[1].data.songs[0].al.name,
        singer: res[1].data.songs[0].ar[0].name,
        singerId: res[1].data.songs[0].ar[0].id,
        mark: res[1].data.songs[0].mark
      });
      context.commit(SETSONG, song);
      context.commit(SETLIST, payload.list);
      context.commit(SETINDEX, payload.index);
      // console.log(song);
    })
  },
  next(context, payload) {
    let list = context.state.playingList,
      index = context.state.playingIndex;
    if (!list) return
    switch (payload.mode) {
      case 0: {
        if (index === list.length - 1) {
          index = 0
        } else {
          index += 1
        }
      }
        break;
      case 1: {
        if (index === list.length - 1) {
          index = 0
        } else {
          index += 1
        }
      }
        break;
      case 2: {
        index = Math.floor((Math.random() * list.length)).toFixed(0)
      }
        break;
    }
    context.dispatch("play", { list: list, index: index })
  },
  last(context, payload) {
    let list = context.state.playingList,
      index = context.state.playingIndex;
    switch (payload.mode) {
      case 0: {
        if (index === 0) {
          index = list.length - 1
        } else {
          index -= 1
        }
      }
        break;
      case 1: {
        if (index === 0) {
          index = list.length - 1
        } else {
          index -= 1
        }
      }
        break;
      case 2: {
        index = Math.floor((Math.random() * list.length)).toFixed(0)
      }
        break;
    }
    context.dispatch("play", { list: list, index: index })
  }
}
