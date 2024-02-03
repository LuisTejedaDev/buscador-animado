import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, Animated, TextInput, View, TouchableOpacity, Image, Keyboard} from 'react-native'

const color = '#3383FF'

export default () => {

    const refInput = useRef()
    const animation = useRef(new Animated.Value(0)).current
    const [toggle, setToggle] = useState(false)
    const [text, setText] = useState('')

    const handleAnimated = () => {
        Animated.timing(animation, {
            toValue: toggle ? 1 : 0,
            duration: 550,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        setText('')
        if(!toggle) Keyboard.dismiss()
        else refInput.current.focus()
        handleAnimated()
    }, [toggle])
    
    const animatedStyles = {
        width: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
            extrapolate: 'clamp'
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TouchableOpacity 
                    onPress={() => setToggle(!toggle)}
                    style={styles.imageContainer}>
                    <Image
                        source={{uri: 'https://i.ibb.co/197914j/lupa.png'}}
                        style={{height: 30, width: 30}}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <Animated.View style={[{height: 50, backgroundColor: color}, animatedStyles]}>
                    <TextInput
                        ref={refInput}
                        value={text}
                        onChangeText={setText}
                        selectionColor={'#fff'}
                        placeholder={'Comienza a buscar...'}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        style={styles.input}
                    />
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    inputContainer: {
        height: 50,
        borderRadius: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    imageContainer: { 
        width: 47,
        height: 47,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        position: 'absolute',
        left: 1,
        borderWidth: 1.5,
        borderColor: '#fff',
        zIndex: 10
    },
    input: {
        height: '100%',
        flex: 1,
        /* backgroundColor: color, */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 60,
    }
})