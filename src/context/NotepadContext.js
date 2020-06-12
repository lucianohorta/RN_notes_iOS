import createDataContext from './createDataContext';  

const date = new Date();
const datecreated = date.toLocaleDateString('pt-BR');

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'add_note':
            return [...state, { 
                id: Math.floor(Math.random() * 99999), 
                // title: `Nota numero #${state.length + 1}` 
                // title: action.payload.title,
                content: action.payload.content,
                datecreated: action.payload.datecreated
            }];
        case 'delete_note':
            return state.filter((setNote) => setNote.id !== action.payload);
        case 'edit_note':
            return state.map(Nota => {
               return Nota.id === action.payload.id ? action.payload : Nota;
            });
        default:
            return state;
    }
};

const addNote = dispatch => {
    return (content, datecreated, callback) => {
        // dispatch({ type: 'add_note', payload: { title: title, content: content }});
        dispatch({ 
            type: 'add_note', 
            payload: { content: content, datecreated: datecreated }});  // abreviacao de cima /\
        callback();   // funcao pra ir pro index do CreateScreen
    };
    // dispatch = setNote (ou qq action)
};

const deleteNote = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_note', payload: id });   // type(thingToDo).. payload(idOfPostToDelete)
    };
}

const editNote = dispatch => {
    return (id, content, callback) => {
        dispatch({ 
            type: 'edit_note', 
            payload: { id: id, content: content, datecreated: datecreated }   //podia ser: id, title, content
        });
        callback();   // funcao pra voltar tela(pop) do EditScreen
    };
}

export const { Context, Provider } = createDataContext(
    noteReducer, 
    {addNote, deleteNote, editNote}, 
    [{ 
        content: 'Bem vindo ao iNotes!!!', 
        id: 1, 
        datecreated: '01/01/2020'  
    }]  // nota teste
    // []
);