import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native';
import _ListStyle from 'antd-mobile/lib/list/style/index.native'
export default {
    ...InputItemStyle,
    input: {
        ...InputItemStyle.input,
        fontSize: 15,
    },
    text:{
        ...InputItemStyle.text,
        fontSize: 15,
    } ,
    rightInput:{
        ...InputItemStyle.input,
        fontSize: 15,
        textAlign:'right',
    },
    // Content:{
    //     ...InputItemStyle.Content,
    //     fontSize: 15,
    // },
    // Extra:{
    //     ...InputItemStyle.Extra,
    //     fontSize:15,
    // },
}
export const ListItemStyle = {
    ..._ListStyle,
    Content:{
        ..._ListStyle.Content,
        fontSize:15,
    },
    Extra:{
        ..._ListStyle.Extra,
        fontSize:15,
    },
}

export const SListItemStyle = {
    ..._ListStyle,
    Content:{
        ..._ListStyle.Content,
        fontSize:13,
    },
    Extra:{
        ..._ListStyle.Extra,
        fontSize:13,
    },
}