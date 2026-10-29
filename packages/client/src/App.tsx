// import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

function App() {
   // const [message, setMessage] = useState('');
   // useEffect(() => {
   //    fetch('/api/hello')
   //       .then((res) => res.json())
   //       .then((data) => setMessage(data.message));
   // }, []);

   return (
      <div className="p-4 h-screen w-full">
         {/* <ChatBot /> */}
         <ReviewList productId={1} />
      </div>
   );
}

export default App;
