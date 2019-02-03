import React from 'react'
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native'

const Loader = ({visible, color='#fff'}) => {
	return (
		<Modal
			animationType="none"
			visible={visible}
			transparent={true}
			onRequestClose={()=> null}
		>
			<View style={styles.loader}>
				<ActivityIndicator color={color} size='large' />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	loader: {
		...StyleSheet.absoluteFill,
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default Loader