import { Accordion, AccordionTab } from 'primereact/accordion';


const BookList = props => {
    return (
        <Accordion>
            {props.data.map(tab => {
                return (
                    <AccordionTab key={tab.isbn} header={tab.bookName} >
                      <span><b>ISBN: </b>&nbsp;{tab.isbn}</span><br></br>
                      <span><b>Author: </b>&nbsp;{`${tab.firstName} ${tab.lastName}`}</span><br></br>
                    </AccordionTab>
                )
              })}
          </Accordion>
    )
}


export default BookList;