import React from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import CustomInput from '../common/input'
import CustomCheckBox from '../common/checkBox'
import { NunitoSans } from '../common/StyledText'

const SubTasks = ({subTasks, onSubTaskChange}) => subTasks.map( st => <CustomCheckBox key={`subTask-${st.index}`} data={st} onSubTaskChange={onSubTaskChange} />)

const CreateTaskCard = ({ taskName, setTaskName, subTasks, onSubTaskChange, addSubtask } ) => {
	return (
		<View style={styles.container}>
			<CustomInput
				placeholder={'Enter the task'}
				autoCorrect={true}
				autoFocus={false}
				clearButtonMode='always'
				onChangeText={(taskName) => setTaskName(taskName)}
				value={taskName}
				style={{fontWeight: 'bold'}}
			/>
			<ScrollView style={{ width: '100%' }} contentContainerStyle={{ ...styles.scroll }} alwaysBounceVertical={true}>
				{ subTasks.length > 0 && <SubTasks subTasks={subTasks} onSubTaskChange={onSubTaskChange} /> }
				<TouchableOpacity onPress={addSubtask} style={styles.addButton}>
					<NunitoSans style={{ color: '#fff' }}> + Add subtask </NunitoSans>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		display: 'flex',
		width: '100%',
		color: '#fff',
		backgroundColor: '#000'
	},
	scroll: {
		paddingTop: 5,
		width: '90%',
		alignSelf: 'center',
		flexGrow: 1
	},
	addButton: { 
		color: '#fff',
		width: 115,
		marginHorizontal: 20,
		display: 'flex',
		alignItems: 'center',
		marginVertical: 15,
		borderWidth: 2,
		borderColor: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingHorizontal: 3,
		paddingVertical: 3,
		borderRadius: 3,
	}
})

export default CreateTaskCard